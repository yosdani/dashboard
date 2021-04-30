import { LoginService } from "./../../services/login.service";
import { ExportService } from "./../../services/export.service";
import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Chart from "chart.js";
import { MatDialog } from "@angular/material/dialog";
import { DetailExportacionProductoComponent } from "../exportaciones/detail-exportacion-producto/detail-exportacion-producto.component";

@Component({
  selector: "app-mainview",
  templateUrl: "./mainview.component.html",
  styleUrls: ["./mainview.component.scss"],
})
export class MainviewComponent implements OnInit {
  color_primary: string;
  color_secondary: string;
  color_tertiary: string;
  dialogResult: string;

  constructor(
    public dialog: MatDialog,
    private exportService: ExportService,
    private zone: NgZone,
    private router: Router,
    private loginService: LoginService
  ) {

    this.color_primary = "#368CDC";
    this.color_secondary = "#83C556";
    this.color_tertiary = "#ED7D31";

  }

  async ngOnInit() {
  }








}
