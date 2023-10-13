import { Button } from "react-native-paper";

/**
 * 
 * @param props 
 * onPressEvent: ()=>{}
 * text : string
 * @returns 
 */
export function CommonButton(props:any){
    return (
        <Button
              style={{
                width: 100,
              }}
              mode="contained"
              onPress={() => {
                // done();
                props.onPressEvent()
              }}>
              {props.text}
            </Button>
    )
}