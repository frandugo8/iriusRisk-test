  
import styles from './navigation.module.scss';
import planetsIcon from '../../../../assets/nav/planets.svg'
import starshipsicon from '../../../../assets/nav/starships.svg'
import peopleIcon from '../../../../assets/nav/people.svg'
import vehiclesIcon from '../../../../assets/nav/vehicles.svg'
import { useNavigate } from 'react-router-dom';
import { NavOptionTypes } from '../../models/nav-options.type';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store/store';
import { setNavOption, toggleMobileNav } from '../../redux/slices/data.slice';

export default function NavigationComponent() {
  const OPTIONS: Array<{
    img: string
    key: NavOptionTypes
    label: string
  }> = [{
    img: planetsIcon,
    key: "planets",
    label: "Planets"
  },{
    img: starshipsicon,
    key: "starships",
    label: "Starships"
  },{
    img: peopleIcon,
    key: "people",
    label: "People"
  },{
    img: vehiclesIcon,
    key: "vehicles",
    label: "Vehicles"
  }]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const navOption = useAppSelector((state: RootState) => state.data.navOption)
  const isMobileNavOpen = useAppSelector((state: RootState) => state.data.isMobileNavOpen)

  const handleClick = (option: NavOptionTypes): void => {
    navigate(`/${option}?page=1`)
    dispatch(setNavOption({navOption: option}))

    if (isMobileNavOpen) dispatch(toggleMobileNav())
  }

  return (
    <nav className={styles.navigation}>
      {OPTIONS.map((option, index) => 
        <div
          data-testid={`${option.key}_navigation`}
          key={index}
          className={navOption === option.key? `${styles.option} ${styles.option___selected}` : styles.option}
          onClick={() => handleClick(option.key)}>
          <img src={option.img} className={styles.option__icon} alt={option.key}/>
          <div className={styles.option__label}>{option.label}</div>
        </div>
      )}
    </nav>
  );
}
