import {Injectable} from '@angular/core';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme = ThemeType.dark;

  getTheme(): ThemeType {
    if (localStorage.getItem('Theme') === null) {
      return ThemeType.dark;
    }
    return ThemeType[localStorage.getItem('Theme')];
  }

  setTheme(theme: ThemeType): void {
    localStorage.setItem('Theme', theme);
  }

  reverse(theme: ThemeType): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark
  }

  removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.getTheme();
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`theme-${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.reverse(theme));
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  public toggleTheme(): Promise<Event> {
    const theme = this.getTheme();
    const target = this.reverse(theme);
    this.setTheme(target);
    return this.loadTheme(false);
  }

}
