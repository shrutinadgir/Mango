import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
    declarations: [SideNavComponent, HeaderComponent],
    exports: [SideNavComponent, HeaderComponent],
    imports: [FormsModule, CommonModule]
})

export class componentModule { }