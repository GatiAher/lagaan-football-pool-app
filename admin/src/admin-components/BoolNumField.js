import React from 'react';
import { BooleanField } from "react-admin";

export const BooleanNumField = ({ record = {}, source }) => {
    let theRecord = { ...record };

    theRecord[source + 'Num'] = !!parseInt(record[source]);

    return <BooleanField record={theRecord} source={source + 'Num'} />
}