import React from 'react';
import { Text } from 'react-native-paper';
import NumberFormat from 'react-number-format';

const ReactNativeNumberFormat = ({ value, allowNegative = false }) => {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
      allowNegative={allowNegative}
      decimalScale={2}
      fixedDecimalScale={true}
      renderText={formattedValue => <Text>{formattedValue}</Text>}
    />
  );
}

export default ReactNativeNumberFormat;