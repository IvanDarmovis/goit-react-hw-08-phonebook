import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css';

function Section({ title }) {
  return (
    <div className={s.section}>
      <p>{title}</p>
    </div>
  );
}

export default Section;

Section.propTypes = {
  title: PropTypes.string,
};
