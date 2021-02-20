interface playerStatus {
  type: string;
}
interface playerStatusActionReturn {
  type: string;
  payload: playerStatus;
}

export { playerStatus, playerStatusActionReturn };
