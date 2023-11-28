export function PageRemainTimer(visitedTime: Date, pageName: string) {
  // 두 날짜 간의 시간 차이를 밀리초로 계산
  const leaveTime = new Date();
  const timeDifferenceInMillis = leaveTime.getTime() - visitedTime.getTime();

  // 밀리초를 다른 단위(초, 분, 시간)로 변환
  const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));
  const remainingMillisAfterHours = timeDifferenceInMillis % (1000 * 60 * 60);

  const minutes = Math.floor(remainingMillisAfterHours / (1000 * 60));
  const remainingMillisAfterMinutes = remainingMillisAfterHours % (1000 * 60);

  const seconds = Math.floor(remainingMillisAfterMinutes / 1000);
  
  console.log(
    `시간 차이: ${hours} 시간, ${minutes % 60} 분, ${seconds % 60} 초`,
  );
  //pageName과 함께 서버에 시간차 값 전송.
  //timeDifferenceInMillis 이걸 보내도 좋고, 따로 알아보기쉽게 hours:miniutes:seconds로 보내도 좋고.


  
  //이거를 서버에 올려서 b랑 분간을 해줘야함. 그래야 ab테스팅을 서로 분간해줄수잇음. 
  //payload에 version으로 분간해주면 좋겠음. 
  const version = 'A'
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const payload = {
    pageName: pageName,
    timeSpent: formattedTime,
    // version: version
  };

  fetch('http://localhost:3000/api/page-remain-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
