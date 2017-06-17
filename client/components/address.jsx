import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { COUNTRIES } from '../constants';
import PropTypes from 'prop-types';

const Address = ({address, onChange, getErrorMessageForInput, title}) => {
  const menuItems = COUNTRIES.map(country => {
    return <MenuItem key={country} value={country} primaryText={t(country)} />;
  });
  return (<div>
            <div>
              <h2>{title}</h2>
            </div>
            <div>
              <TextField id="name" type="text" style={{width:'100%'}} onChange={(e) => {onChange('name', e.target.value);}}
                  floatingLabelText={t('name')}
                  defaultValue={address.name}
                  errorText={getErrorMessageForInput('name')} />
            </div>
            <div>
              <TextField id="street" type="text" style={{width:'100%'}} onChange={(e) => {onChange('street', e.target.value);}}
                  floatingLabelText={t('street')}
                  defaultValue={address.street}
                  errorText={getErrorMessageForInput('street')} />
            </div>
            <div>
              <TextField id="housenumber" type="text" style={{width:'100%'}} onChange={(e) => {onChange('housenumber', e.target.value);}}
                  floatingLabelText={t('housenumber')}
                  defaultValue={address.housenumber}
                  errorText={getErrorMessageForInput('housenumber')} />
            </div>
            <div>
              <TextField id="busnumber" type="text" style={{width:'100%'}} onChange={(e) => {onChange('busnumber', e.target.value);}}
                  floatingLabelText={t('bus')}
                  defaultValue={address.busnumber}
                  errorText={getErrorMessageForInput('busnumber')} />
            </div>
            <div>
              <TextField id="city" type="text" style={{width:'100%'}} onChange={(e) => {onChange('city', e.target.value);}}
                  floatingLabelText={t('city')}
                  defaultValue={address.city}
                  errorText={getErrorMessageForInput('city')} />
            </div>
            <div>
                <TextField id="postalcode" type="text" style={{width:'100%'}} onChange={(e) => {onChange('postalcode', e.target.value);}}
                    floatingLabelText={t('postalcode')}
                      defaultValue={address.postalcode}
                    errorText={getErrorMessageForInput('postalcode')} />
            </div>
            <div className="row">
              <SelectField id="country" style={{width:'100%', textAlign:'left'}} floatingLabelText={t('country')}
                onChange={(event, index, value) => onChange('country', value)}
                value={address.country.toLowerCase()} errorText={getErrorMessageForInput('country')}>
                  {menuItems}
              </SelectField>
            </div>
        </div>);

};
Address.propTypes = {
  address: PropTypes.object,
  onChange: PropTypes.func,
  getErrorMessageForInput: PropTypes.func,
  title: PropTypes.string,
};
export default Address;