/* eslint-disable prettier/prettier */
import {useRef} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import {Divider, List} from 'react-native-paper';
import { CenterView, LargeSizeText, MiddleSizeText } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store';
import { BePremiumUser } from '../ingredientSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PremiumUserModal(props: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const message: number = props.payload.message
  const dispatch = useDispatch();
  return (
    <ActionSheet ref={actionSheetRef}>
      <CenterView style={{
        height:200
      }}>
        <MiddleSizeText>
            {message}
        </MiddleSizeText>
        <LargeSizeText>
            UNLOCK UNLIMITED FEATURES!
        </LargeSizeText>

        <TouchableOpacity style={{
            backgroundColor:'#0000aaaa',
            padding:10
        }}
        onPress={()=>{
            dispatch(BePremiumUser({}))
            if (actionSheetRef.current) {
                actionSheetRef.current.hide()
            }
        }}
        >
            <LargeSizeText style={{
                color:'white'
            }}>
                BE A PREMIUM USER
            </LargeSizeText>
        </TouchableOpacity>
      </CenterView>
    </ActionSheet>
  );
}

export default PremiumUserModal;
