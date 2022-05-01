
import { RootState, useAppSelector } from '../../../../shared/redux/store/store';
import styles from './card.module.scss';
import unrecognizedImg from '../../../../../assets/shared/unrecognized.png'
import { ListElement } from '../../../../shared/models/list-element.type';
import { Planet } from '../../../../shared/models/planet.interface';
import ResidentComponent from './resident/resident.component';
import { Starship } from '../../../../shared/models/starship.interface';
import { People } from '../../../../shared/models/people.interface';
import { Vehicles } from '../../../../shared/models/vehicles.interface';

interface CardProps {
  element: ListElement  
}
export default function CardComponent({element}: CardProps) {
  const navOption = useAppSelector((state: RootState) => state.data.navOption)

  const handleImage = (): string => {
    try {
      const file = require(`../../../../../assets/${navOption}/${element.name.replace(/[^a-zA-Z1-9]/g, "").toLowerCase()}.png`)
      
      return file
    } catch {
      return unrecognizedImg
    }
  }

  const handlePopulation = (population?: string): string => {
    if (population === "unknown" || population === undefined) {
      return "Unknown population"
    } else {
      const n = parseInt(population)

      if (n >= 1e3 && n < 1e6) return `Population of ${(n / 1e3)} K`
      if (n >= 1e6 && n < 1e9) return `Population of ${(n / 1e6)} M`
      if (n >= 1e9 && n < 1e12) return `Population of ${(n / 1e6)} B`;
      if (n >= 1e12) return `Population of ${(n / 1e6)} T`;
      else return `Population of ${n}`
    }

  }

  const handleDetails = (): any => {
    switch (navOption) {
      case "planets":
        return (
          <>
            <div className={styles.details__info}>{(element as Planet).terrain}</div>
            <div className={styles.population}>
              <div>{handlePopulation((element as Planet).population)}</div>
              <div className={styles.population__list}>
                {(element as Planet).residents?.slice(0, 3).map((resident: string, index: number) => 
                  <ResidentComponent key={`${(element as Planet).name}_${index}`} resident={resident}/>
                )}
              </div>
            </div>
          </>
        )
      case "starships":
        return (
          <>
            <div className={styles.details__info}>Total crew {(element as Starship).crew}</div>
            <div className={styles.details__info}>Cargo capacity {(element as Starship).cargo_capacity}</div>
          </>
        )
      case "people":
        return (
          <>
            <div className={styles.details__info}>{(element as People).gender}</div>
            <div className={styles.details__info}>{(element as People).height} cm</div>
          </>
        )
      case "vehicles":
      default:
        return (
          <>
            <div className={styles.details__info}>Total crew {(element as Vehicles).crew}</div>
            <div className={styles.details__info}>Depletion of resources {(element as Vehicles).consumables}</div>
          </>
        )
    }
  }

  return (
    <div className={styles.card}>
      <img src={handleImage()} className={styles.card__image} alt="card"/>
      <div className={styles.details}>
        <div className={styles.details__name}>{element.name}</div>
        {handleDetails()}
      </div>
    </div>
  );
}
