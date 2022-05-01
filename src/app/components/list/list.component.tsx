
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavOptionTypes } from '../../shared/models/nav-options.type';
import { Planet } from '../../shared/models/planet.interface';
import { setNavOption } from '../../shared/redux/slices/data.slice';
import { useAppDispatch } from '../../shared/redux/store/store';
import { SwapiRemoteService } from '../../shared/services/remote/swapi/swapi.remote.service';
import ListBackgroundComponent from './components/background/list-background.component';
import CardComponent from './components/card/card.component';
import HeaderComponent from './components/header/header.component';
import styles from './list.module.scss';
import PaginationComponent from './components/pagination/pagination.component';
import { ListElement } from '../../shared/models/list-element.type';
import { SortOptionsType } from '../../shared/models/sort-options.type';
import { Starship } from '../../shared/models/starship.interface';

interface ListProps {
  option: NavOptionTypes
}

interface Response {
  count: number
  next: string | null
  previous: string | null
  results?: Array<Planet>
}

export default function ListComponent({option}: ListProps) {
  const [elements, setElements] = useState<Array<ListElement>>([])
  const [searchParams] = useSearchParams();
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [hasPrev, setHasPrev] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const dispatch = useAppDispatch()
  const [elementsToShow, setElementsToShow] = useState<Array<any>>([])
  const [sortOption, setSortOption] = useState<SortOptionsType>("unselect")
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    dispatch(setNavOption({navOption: option}))
  }, [option, dispatch])

  useEffect(() => {
    setElementsToShow(
      elements.slice()
        .filter((element: ListElement) => element.name.toLowerCase().startsWith(search.toLowerCase()))
        .sort((a: ListElement, b: ListElement) => {
          if (sortOption === "name") {
            return a.name.localeCompare(b.name)
          } else if (option === "starships" && sortOption === "capacity") {
            return parseInt((a as Starship).cargo_capacity) - parseInt((b as Starship).cargo_capacity)
          } else if (option === "starships" && sortOption === "crew") {
            return parseInt((a as Starship).crew) - parseInt((b as Starship).crew)
          }
          return 0
        })
    )
  }, [sortOption, search, elements, option])

  useEffect(() => {
    SwapiRemoteService.getCards(option, searchParams.get("page")).then(async (fetch: any) => {
      const response: Response = await fetch.json()
      if (response.results !== undefined) {
        setElements(response.results)
        setElementsToShow(response.results)
      }
      setSortOption("unselect")
      setHasNext(response.next !== null)
      setHasPrev(response.previous !== null)
      setTotal(response.count)
    })
  }, [searchParams, option])

  const handleSearch = (text: string): void => {
    setSearch(text)
  }

  return (
    <div className={styles.wrapper}>
      <ListBackgroundComponent/>
      <HeaderComponent option={option} handleSearch={handleSearch} sortOption={sortOption} setSortOption={setSortOption}/>

      <div className={styles.list}>
        <div className={styles.content}>
          <div className={styles.content__elements}>
            {elementsToShow.map((element: ListElement, index: number) => 
              <CardComponent
                key={index}
                element={element}/>
            )}
          </div>

          <PaginationComponent hasNext={hasNext} hasPrev={hasPrev} perPage={elements.length} total={total}/>
        </div>

      </div>

    </div>
  );
}
