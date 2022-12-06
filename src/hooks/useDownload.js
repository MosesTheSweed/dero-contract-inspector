import React from 'react';
import {ContractUtils} from '../utils/contractHelper.js';

export const useDownload = () => {
  const exportToJson = (data) => {
    downloadFile({
      data: JSON.stringify(data),
      fileName: 'SCVars.json',
      fileType: 'text/json',
    })
  }

  const exportToCsv = (data) => {
    const headers = ['Name|Json|Hex']
    const scVars = data.reduce((acc, scVar) => {
      const {name, value} = scVar
      const jsonValue = ContractUtils.hexToJson(value )
      acc.push([name, jsonValue, value].join('|'))
      return acc
    }, [])

    downloadFile({
      data: [...headers, ...scVars].join('\n'),
      fileName: 'SCVars.csv',
      fileType: 'text/csv',
    })
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  return {exportToCsv, exportToJson}
}