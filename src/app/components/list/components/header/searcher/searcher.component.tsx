
import { useRef } from 'react';
import { RootState, useAppSelector } from '../../../../../shared/redux/store/store';
import styles from './searcher.module.scss';
import searchIcon from '../../../../../../assets/shared/search.svg'

interface SearcherProps {
  handleSearch(text: string): void
}

export default function SearcherComponent({handleSearch}: SearcherProps) {
  const inputRef = useRef<any>()
  const navOption = useAppSelector((state: RootState) => state.data.navOption)
  
  const handleKeyDown = (): void => {
    handleSearch(inputRef.current.value)
  }

  return (
    <div className={styles.searcher}>
      <img src={searchIcon} className={styles.searcher__icon} alt="search"/>

      <input
        ref={inputRef}
        type="text"
        placeholder={`Search ${navOption}`}
        className={styles.searcher__input}
        onInput={handleKeyDown}/>
    </div>
  );
}
