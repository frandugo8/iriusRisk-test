
import styles from './dropdown.module.scss';
import sortIcon from '../../../../../../assets/shared/sort.svg'
import { useState } from 'react';
import { RootState, useAppSelector } from '../../../../../shared/redux/store/store';
import { SortOptionsType } from '../../../../../shared/models/sort-options.type';

interface HeaderDropdownProps {
  sortOption: SortOptionsType
  setSortOption: React.Dispatch<React.SetStateAction<SortOptionsType>>
}

export default function HeaderDropdownComponent({sortOption, setSortOption}: HeaderDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const navOption = useAppSelector((state: RootState) => state.data.navOption)

  const toggleDropdown = (): void => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className={styles.header}>
      <img src={sortIcon} alt="sort" className={styles.header__icon}/>

      <div data-testid="dropdown-button" className={styles.dropdown} onClick={toggleDropdown}>
        {sortOption === "unselect"? "Order by" : `${sortOption.charAt(0).toUpperCase()}${sortOption.slice(1)}`}

        {isDropdownVisible?
          <ul className={styles.list}>
            <li className={styles.list__row} onClick={() => setSortOption("unselect")}>Unselect</li>
            <li className={styles.list__row} onClick={() => setSortOption("name")}>Name</li>
            {navOption === "starships"? 
              <>
                <li className={styles.list__row} onClick={() => setSortOption("crew")}>Crew</li>
                <li className={styles.list__row} onClick={() => setSortOption("capacity")}>Cargo capacity</li>
              </>
              : ""  
            }
          </ul>
        : ""}
      </div>
    </div>
  );
}
