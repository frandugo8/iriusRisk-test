
import { useEffect, useRef, useState } from 'react';
import styles from './resident.module.scss';
import unrecognizedImg from '../../../../../../assets/shared/unrecognized.png'
import { SwapiRemoteService } from '../../../../../shared/services/remote/swapi/swapi.remote.service';
import { People } from '../../../../../shared/models/people.interface';

interface ResidentProps {
  resident: string
}

export default function ResidentComponent({resident}: ResidentProps) {
  const [name, setName] = useState<string>("")
  const isMounted = useRef(true);

  useEffect(() => {
    SwapiRemoteService.getUserInfo(resident).then(async (fetch: any) => {
      const response: People = await fetch.json()

      if (isMounted.current) {
        setName(response.name)
      }

      return () => {
        isMounted.current = false
      };
    })
  }, [resident])

  const handleImage = (): string => {
    try {
      const file = require(`../../../../../../assets/people/${name.replace(/[^a-zA-Z1-9]/g, "").toLowerCase()}.png`)
      
      return file
    } catch {
      return unrecognizedImg
    }
  }

  return (
    <img src={handleImage()} className={styles.resident} alt="avatar"/>);
}
