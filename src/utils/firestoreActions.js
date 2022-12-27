import {
  deleteDoc,
  deleteField,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import { firestore } from '../firebase-config';

export const toggleCheckTask = async (day, taskName, taskData) => {
  await setDoc(
    doc(firestore, `tasks/${day}`),
    { [taskName]: { ...taskData, done: !taskData.done } },
    { merge: true }
  );
};

export const deleteTask = async (day, taskName) => {
  await updateDoc(doc(firestore, `tasks/${day}`), {
    [taskName]: deleteField()
  });
};

export const deleteDay = async (day) => {
  await deleteDoc(doc(firestore, `tasks/${day}`));
};

export const addTask = async (day, taskName, taskData, prevName) => {
  await setDoc(
    doc(firestore, `tasks/${day}`),
    { [taskName]: taskData },
    { merge: true }
  );

  if (prevName && prevName !== taskName) {
    await deleteTask(day, prevName);
  }
};
