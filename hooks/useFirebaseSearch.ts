import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {IBook} from '../components/books/interfaces';

const useFirebaseSearch: (
  credentials: object,
) => [
  any,
  any
] = (credentials: object) => {
  const [response, setResponse] = useState<IBook[]>([]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials);
    }
  }, []);

  const searchAlgorithm = (data: IBook[], keySearch: string) => {
    const responseArr: IBook[] = [];
    data.forEach((doc) => {
      if (doc.cate) {
        const isContained = doc.cate.some((item: any) => {
          keySearch.includes(item);
        });
        if (isContained) {
          return responseArr.push(doc);
        }
      }
      if (doc.name) {
        const isContained = doc.name.includes(keySearch);
        if (isContained) {
          return responseArr.push(doc);
        }
      }
    });
    return responseArr;
  };
  const handleSearch = async (
    keySearch: string,
  ) => {
    const responseFromFirebase = await firebase
      .firestore()
      .collection('books')
      .get();

    const parseDocs: IBook[] = [];
    responseFromFirebase.forEach( doc => {
      parseDocs.push(doc.data() as IBook);
    });
    // console.log(parseDocs);
    const result: IBook[] = searchAlgorithm(parseDocs, keySearch);
    // console.log(result);
    setResponse(result);
  };
  return [response, handleSearch];
};

export default useFirebaseSearch;
