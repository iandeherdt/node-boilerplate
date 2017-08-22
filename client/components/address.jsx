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
  return (<div className="margin-left-right-small">
    <div>
      <h2 className="inlineH2">{title}</h2>
    </div>
    <div className="flex-row">
      <div className="flex-column">
        <TextField id="addressName" type="text" onChange={(e) => {onChange('addressName', e.target.value);}}
          floatingLabelText={t('name')}
          defaultValue={address.name}
          errorText={getErrorMessageForInput('addressName')} />
      </div>
    </div>
    <div className="flex-row">
      <div className="flex-column">
        <TextField id="street" type="text" onChange={(e) => {onChange('street', e.target.value);}}
          floatingLabelText={t('street')}
          defaultValue={address.street}
          errorText={getErrorMessageForInput('street')} />
      </div>
      <div className="flex-column">
        <TextField id="house" type="text" onChange={(e) => {onChange('house', e.target.value);}}
          floatingLabelText={t('housenumber')}
          defaultValue={address.housenumber}
          errorText={getErrorMessageForInput('house')} />
      </div>
    </div>
    <div className="flex-row">
      <div className="flex-column">
        <TextField id="bus" type="text" onChange={(e) => {onChange('bus', e.target.value);}}
          floatingLabelText={t('bus')}
          defaultValue={address.busnumber}
          errorText={getErrorMessageForInput('bus')} />
      </div>
    </div>
    <div className="flex-row">
      <div className="flex-column">
        <TextField id="city" type="text" onChange={(e) => {onChange('city', e.target.value);}}
          floatingLabelText={t('city')}
          defaultValue={address.city}
          errorText={getErrorMessageForInput('city')} />
      </div>
      <div className="flex-column">
        <TextField id="postal" type="text" onChange={(e) => {onChange('postal', e.target.value);}}
          floatingLabelText={t('postalcode')}
          defaultValue={address.postalcode}
          errorText={getErrorMessageForInput('postal')} />
      </div>
    </div>
    <div className="flex-row">
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