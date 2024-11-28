import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({
  selector: '[appAuthState]',
  standalone: true,
})
export class AuthStateDirective {
  private isAuthenticated = false;
  private showIfAuthenticated = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cdRef: ChangeDetectorRef
  ) {}

  @Input() set appAuthState(showIfAuthenticated: boolean | '') {
    this.showIfAuthenticated =
      showIfAuthenticated === '' ? true : !!showIfAuthenticated;
    this.checkAuthentication(); // Revisa el estado de autenticación
  }

  private checkAuthentication() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isAuthenticated = !!localStorage.getItem('authToken'); // Verifica si hay un token en localStorage
    }
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.isAuthenticated === this.showIfAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Actualiza la vista
    }
    this.cdRef.detectChanges(); // Fuerza la actualización del componente
  }
}
