import {
  deleteDoc,
  deleteField,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import { firestore } from '../firebase-config';

export const toggleCheckTask = async (user, day, taskName, taskData) => {
  await setDoc(
    doc(firestore, `users/${user}/tasks/${day}`),
    { [taskName]: { ...taskData, done: !taskData.done } },
    { merge: true }
  );
};

export const deleteTask = async (user, day, taskName) => {
  await updateDoc(doc(firestore, `users/${user}/tasks/${day}`), {
    [taskName]: deleteField()
  });
};

export const deleteDay = async (user, day) => {
  await deleteDoc(doc(firestore, `users/${user}/tasks/${day}`));
};

export const addTask = async (
  user,
  day,
  taskName,
  taskData,
  prevName,
  prevDate
) => {
  await setDoc(
    doc(firestore, `users/${user}/tasks/${day}`),
    { [taskName]: taskData },
    { merge: true }
  );

  if ((prevName && prevName !== taskName) || (prevDate && prevDate !== day)) {
    await deleteTask(user, prevDate, prevName);
  }
};
