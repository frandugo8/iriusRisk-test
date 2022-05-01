
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import FooterComponent from './components/footer/footer.component';
import ListComponent from './components/list/list.component';
import MobileNavComponent from './components/mobile-nav/mobile-nav.component';
import NavigationMenuComponent from './components/navigation-menu/navigation-menu.component';
import { NavOptionTypes } from './shared/models/nav-options.type';

export default function AppComponent() {
  const NAV_OPTIONS: Array<NavOptionTypes> = ["planets", "starships", "people", "vehicles"]

  return (
    <BrowserRouter>

    <div className={styles.app}>

        <MobileNavComponent/>
  
        <div className={styles.content}>
          <NavigationMenuComponent/>

          <Routes>
            {NAV_OPTIONS.map((option: NavOptionTypes, index: number) => 
              <Route key={index} path={`/${option}`} element={<ListComponent option={option}/>}/>
            )}
            <Route path='*' element={<Navigate to="/planets?page=1"/>}/>
          </Routes>
        </div>

        <FooterComponent/>
    </div>
    </BrowserRouter>

  );
}
