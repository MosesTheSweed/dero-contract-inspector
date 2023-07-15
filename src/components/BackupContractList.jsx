import {LIST_KEY} from "@/enums/DeroContractConstants.js";
import {useState} from "react";

export const BackupContractList = () => {
  const [backupData, setBackupData] = useState(null)

  const handleBackup = () => {
    const stringifiedData = JSON.stringify(JSON.parse(localStorage.getItem(LIST_KEY)), null, 2);
    const blob = new Blob([stringifiedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    setBackupData(url); // save url in state to trigger re-render

    downloadBackup(url)
  }

  const downloadBackup = (url) => {
    const link = document.createElement('a');
    link.href = url
    link.download = 'smart_contract_storage_list_backup.json';

    link.onload = function() {
      URL.revokeObjectURL(backupData);
      setBackupData(null);
    }

    link.click();
  }

  return (
    <>
      <button type='button' onClick={handleBackup} className="inline-flex items-center py-2.5 px-4 pr-6 ml-2 text-xs text-purple-800 rounded-lg border border-blue-700 hover:bg-cyan-700 hover:text-neutral-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-400 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:text-purple-400 disabled:bg-slate-300">
        Backup List
      </button>
    </>
  )
}