import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../Redux/Slices/ThemeSlice';
import LocalStorage from '../../Utils/LocalStorage';

const CustomSwitch = () => {
    const { isDark } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const onToggleSwitch = () => {
        dispatch(changeTheme(!isDark));
        LocalStorage.SetData('Theme',!isDark);
        console.log('first',isDark)
    };

    return <Switch value={isDark} onValueChange={onToggleSwitch} />;
}

export default CustomSwitch