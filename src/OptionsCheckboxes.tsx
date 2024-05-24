import { Flex, CheckboxField } from '@aws-amplify/ui-react';

function OptionsCheckboxes({ options, setOptions }: {options: any, setOptions: any}) {
  return (
    <Flex wrap={'wrap'} margin={'20px 0'}>
      <CheckboxField label="Gamma function" name="gamma-function" value="yes" checked={options.gammaFuncCheckBox} onChange={(e) => setOptions({
        ...options, gammaFuncCheckBox: e.target.checked
      })} />
      <CheckboxField label="Euler's identity" name="eulers-identity" value="yes" checked={options.eulersIdentityCheckBox} onChange={(e) => setOptions({
        ...options, eulersIdentityCheckBox: e.target.checked
      })} />
      <CheckboxField label="Exponential Limits" name="limits-exponential" value="yes" checked={options.limitExponentialCheckBox} onChange={(e) => setOptions({
        ...options, limitExponentialCheckBox: e.target.checked
      })} />
      <CheckboxField label="Polynomial Limits" name="limits-polynomial" value="yes" checked={options.limitPolynomialCheckBox} onChange={(e) => setOptions({
        ...options, limitPolynomialCheckBox: e.target.checked
      })} />
      <CheckboxField label="Geometric Series" name="geometric-series" value="yes" checked={options.geometricSeriesCheckBox} onChange={(e) => setOptions({
        ...options, geometricSeriesCheckBox: e.target.checked
      })} />
    </Flex>
  );
}

export default OptionsCheckboxes;
