<script>
  import { encrypt, decrypt, recoverVigenere } from './core/vigenere-cipher';

  let cryptModes = [
    { title: 'Encryption', fn: encrypt, valueLabel: 'Cipher Key' },
    { title: 'Decryption With Key', fn: decrypt, valueLabel: 'Cipher Key' },
    { title: 'Decryption', fn: recoverVigenere, valueLabel: 'Max Key Length'}
  ];

  let selectedMode = cryptModes[0];
  let valueText = '';
  let cipherInput = '';
  let cipherOutput = '';
  $: if (valueText && cipherInput && (selectedMode != cryptModes[2] || !isNaN(valueText))) {
    cipherOutput = selectedMode.fn(cipherInput, isNaN(valueText) ? valueText : +valueText);
  }

  function resetMode() {
    cipherOutput = '';
    cipherInput = '';
    valueText = '';
  }
</script>

<table>
  <tr>
    <td>Cryptographic mode:</td>
    <td>
      <select bind:value={selectedMode} on:change={resetMode}>
        {#each cryptModes as mode}
          <option value={mode}>
            {mode.title}
          </option>
        {/each}
      </select>
    </td>
  </tr>
  <tr>
    <td>{selectedMode.valueLabel}</td>
    <td>
      <input bind:value={valueText}/>
    </td>
  </tr>
</table>

<div>
  <textarea placeholder="input text here" bind:value={cipherInput}/>
</div>

{#if selectedMode == cryptModes[2] && cipherOutput && cipherOutput.key}
  <p>{`Recovered key: ${cipherOutput.key}`}</p>
  <p>{cipherOutput.plainText}</p>
{:else}
  <p>{cipherOutput ? cipherOutput : ''}</p>
{/if}
