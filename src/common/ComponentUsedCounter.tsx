export function ComponentUsedCounter(count: number,componentName: string) {
   
    //서버에 카운터값과 컴포넌트이름을 같이전송.
    //이거는 다소 비용이들겠지만, 유저의 사용기록을 추적하는거니 서버에 얹을 필요가있겠다.
    //이때, 이미 추가된 값이 +1되어서 서버에 간다면,
    //create보다는 update를 쓸 수 있으면 그러는 편이낫겠고 (db사용한다면)
    //아닐경우 그냥 어떻게든 이 값을 서버에 저장하는것으로 만족해도 좋겠다. ex) addButton 1 -> addButton 2 이런식으로..
    console.log(componentName,':', count)
    
  //이거를 서버에 올려서 a랑 분간을 해줘야함. 그래야 ab테스팅을 서로 분간해줄수잇음. 
    const version = 'B'

}
  