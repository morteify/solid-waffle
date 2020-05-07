import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Spin, PageHeader } from 'antd';
import styled from 'styled-components';

function QueueView(): JSX.Element {
  return (
    <div>
      <PageHeader className="site-page-header" title="QueueView" subTitle="Tracks queue" />
    </div>
  );
}

export default QueueView;
