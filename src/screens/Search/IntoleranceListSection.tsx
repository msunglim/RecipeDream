import {useEffect, useState} from 'react';
import {Checkbox, List} from 'react-native-paper';
/**
 * 
 * @param props 
 *  intoleranceList= string[]
    setIntoleranceList= set intoleranceList
 * @returns 
 */
export function IntoleranceListSection(props: any) {
  const [intoleranceList, setIntoleranceList] = useState<string[]>(
    props.intoleranceList,
  );
  
  function toggle(item: string) {
    let copy: string[] = [...props.intoleranceList];
    if (copy.includes(item)) {
      let newList = copy.filter(intolerance => item != intolerance);
      props.setIntoleranceList(newList);
      setIntoleranceList(newList);
    } else {
      copy.push(item);
      props.setIntoleranceList(copy);
      setIntoleranceList(copy);
    }
  }
  function Iscontains(item: string) {
    return intoleranceList.includes(item) ? 'checked' : 'unchecked';
  }
  const options = [
    'Diary',
    'Peanut',
    'Soy',
    'Egg',
    'Seafood',
    'Sulfite',
    'Gluten',
    'Seasame',
    'Tree Nut',
    'Grain',
    'Shellfish',
    'Wheat',
  ];
  return (
    <List.Accordion
    left={props => <List.Icon {...props} icon="skull-crossbones" color='red'/>}
      theme={{
        colors: {
          primary: 'black',
          secondary: 'transparent',
          background: 'transparent',
        },
      }}
      title="intolerances"
      id="intolerance">
      {options.map((intolerance, index) => (
        <List.Item
          key={index}
          title={intolerance}
          right={() => (
            <Checkbox
              onPress={() => {
                toggle(intolerance);
              }}
              status={Iscontains(intolerance)}
            />
          )}
        />
      ))}
    </List.Accordion>
  );
}
