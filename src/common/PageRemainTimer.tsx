export function PageRemainTimer(visitedTime: Date, pageName: string) {
  // 두 날짜 간의 시간 차이를 밀리초로 계산
  const leaveTime = new Date();
  const timeDifferenceInMillis = leaveTime.getTime() - visitedTime.getTime();

  // 밀리초를 다른 단위(초, 분, 시간)로 변환
  const seconds = Math.floor(timeDifferenceInMillis / 1000);
  const minutes = Math.floor(timeDifferenceInMillis / (1000 * 60));
  const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));

  console.log(
    `시간 차이: ${hours} 시간, ${minutes % 60} 분, ${seconds % 60} 초`,
  );
  //pageName과 함께 서버에 시간차 값 전송.
  //timeDifferenceInMillis 이걸 보내도 좋고, 따로 알아보기쉽게 hours:miniutes:seconds로 보내도 좋고.
}