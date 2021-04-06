import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";
import {PlaylistService} from "../../../playlists/services/playlist.service";
import {PlayList} from "../../../../entities/play-list";

@Component({
  selector: 'shared-select-playlist',
  templateUrl: './settings-select-playlist.component.html',
  styleUrls: ['./settings-select-playlist.component.css']
})
export class SettingsSelectPlaylistComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  notes: string;

  @Input()
  nzRequired: boolean = true;

  @Input()
  nzErrorTip?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  loading: boolean = true;
  options: PlayList[] = [];

  constructor(private service: PlaylistService) {
  }

  ngOnInit(): void {
    this.service.findSelf().subscribe(playlists => {
      this.options = playlists;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
    this.formGroup.get(this.id).valueChanges.subscribe(value => {
      this.createCustom(value);
    });
  }

  createCustom(id: string) {
    let found = this.options.find((item) => item.id === id);
    if (found || id == null) {
      return;
    }
    console.log(id);
    console.log(this.options);
    this.loading = true;
    this.service.findById(id).subscribe(playlist => {
      this.options.push(playlist);
      this.loading = false;
    }, (_) => {
      this.formGroup.get(this.id).patchValue(null);
      this.loading = false;
    });
  }

}
