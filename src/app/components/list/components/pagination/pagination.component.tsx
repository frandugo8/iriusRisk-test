
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState, useAppSelector } from '../../../../shared/redux/store/store';
import styles from './pagination.module.scss';

interface PaginationProps {
  hasNext: boolean
  hasPrev: boolean
  perPage: number
  total: number
}

export default function PaginationComponent({hasNext, hasPrev, perPage, total}: PaginationProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const navOption = useAppSelector((state: RootState) => state.data.navOption)

  const handleButtonClick = (option: "prev" | "next"): void => {
    const currentPage = searchParams.get("page")

    if (currentPage !== null) {
      navigate(`/${navOption}?page=${parseInt(currentPage) + (option === "next"? 1 : -1)}`)
    }
  }

  const handlePaginationInfoText = (): string => {
    const currentPage = searchParams.get("page")

    return `${currentPage !== null? parseInt(currentPage) : 1} to ${perPage} of ${total} ${navOption}`
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>

        {hasPrev?
          <button onClick={() => handleButtonClick("prev")} type="button" className={styles.button}>
            <div className={styles.label}>Previous</div>
          </button>
          : ""
        }

        <div className={styles.pagination__info}>{handlePaginationInfoText()}</div>
        

        {hasNext?
          <button onClick={() => handleButtonClick("next")} type="button" className={styles.button}>
            <div className={styles.label}>Next</div>
          </button>
          : ""
        }
      
      </div>
    </footer>
  );
}
