import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AccessibilityNotification, NotificationService } from 'src/app/notification-service.service';
import { Status } from 'src/app/Status';
import { TrailPreviewResponse, TrailPreviewService } from 'src/app/trail-preview-service.service';
import { TrailCoordinates, TrailResponse, TrailService } from 'src/app/trail-service.service';

@Component({
  selector: 'app-accessibility-add',
  templateUrl: './accessibility-add.component.html',
  styleUrls: ['./accessibility-add.component.scss']
})
export class AccessibilityAddComponent implements OnInit {

  formGroup: FormGroup;

  trailIds: string[];
  trailResponse: TrailPreviewResponse
  previewCoords: TrailCoordinates[];

  constructor(
    private trailPreviewService: TrailPreviewService,
    private trailService: TrailService,
    private accessibility: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl("", Validators.required),
      reportDate: new FormControl("", Validators.required),
      isMinor: new FormControl(true, Validators.required),
      description: new FormControl("", Validators.required),
      location: new FormGroup({
        "name": new FormControl(""),
        "tags": new FormControl(""),
        "latitude": new FormControl("", Validators.required),
        "longitude": new FormControl("", Validators.required),
        "altitude": new FormControl("", Validators.required),
        "distanceFromTrailStart": new FormControl("", Validators.required)
      })
    });
    this.trailPreviewService.getPreviews(0, 10).subscribe(x => { this.onLoad(x) })
  }

  onLoad(x: TrailPreviewResponse) {
    this.trailResponse = x;
    this.trailIds = x.content.map(tp => tp.code);
    this.selectTrailControl.valueChanges.subscribe(changes => this.onChanges(changes))
  }

  onChanges(changes: any): void {
    let trailId = changes;
    this.trailService.getTrailByCode(trailId).subscribe(x => this.onLoadedTrail(x))
  }

  onLoadedTrail(x: TrailResponse) {
    let trail = x.content[0];
    this.previewCoords = trail.coordinates;
  }

  onSaveNotification() {
    if (this.formGroup.valid) {
      const objValue = this.formGroup.value; 
      let reportedDate = objValue.reportDate;
      let notification = objValue as AccessibilityNotification;
      let date = moment(reportedDate.year +
        "-" + reportedDate.month +
        "-" + reportedDate.day).toDate()
      notification.reportDate = date.toDateString();
      notification.coordinates = { latitude: objValue.location.latitude, longitude:  objValue.location.longitude, altitude: objValue.location.altitude };
      this.accessibility.createNotification(notification).subscribe(x => { if (x.status == Status.OK) this.onSaveSuccess(notification) });
    } else {
      alert("Il modulo contiene ancora alcuni elementi vuoti/errati. Ricontrolla per procedere");
    }
  }

  onSaveSuccess(notification: AccessibilityNotification): void {
    this.router.navigate(['/admin/accessibility', { success: notification.id }]);
  }

  get selectTrailControl(): FormControl {
    return this.formGroup.controls["code"] as FormControl;
  }

  get locationGroup(): FormControl {
    return this.formGroup.controls["location"] as FormControl;
  }


}
