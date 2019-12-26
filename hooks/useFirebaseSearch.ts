import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { IBook } from '../components/books/interfaces';

const useFirebaseSearch: (
  credentials: object,
) => [
  IBook[],
  (keySearch: string) => Promise<void>,
] = (credentials: object) => {
  const [response, setResponse] = useState<IBook[]>([]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials);
    }
  }, []);

  const preProcess = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = _.lowerCase(str);
    return str;
  };
  const searchAlgorithm = (data: IBook[], keySearch: string) => {
    const responseArr: IBook[] = [];
    const search = preProcess(keySearch);
    data.forEach((doc) => {
      if (doc.cate) {
        const isContained = doc.cate.some((item: string) => {
          return search.includes(preProcess(item));
        });
        if (isContained) {
          return responseArr.push(doc);
        }
      }
      if (doc.name) {
        const name = preProcess(doc.name);
        const isContained = name.includes(search);
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
    try {
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
    } catch ( e ) {
      setResponse([]);
    }
  };
  return [response, handleSearch];
};

export default useFirebaseSearch;
