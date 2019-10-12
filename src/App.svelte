<script>
  import { encrypt, decrypt, recoverVigenere } from './core/vigenere-cipher.ts';

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
    <td><label for="cryptMode">Cryptographic mode:</label></td>
    <td>
      <select id="cryptMode" bind:value={selectedMode} on:change={resetMode}>
        {#each cryptModes as mode}
          <option value={mode}>
            {mode.title}
          </option>
        {/each}
      </select>
    </td>
  </tr>
  <tr>
    <td><label for="valueText">{selectedMode.valueLabel}</label></td>
    <td>
      <input id="valueText" bind:value={valueText}/>
    </td>
  </tr>
</table>

<div>
  <label>
    Plain / Cipher text
    <textarea bind:value={cipherInput}/>
  </label>
</div>

{#if selectedMode == cryptModes[2] && cipherOutput && cipherOutput.key}
  <p>{`Recovered key: ${cipherOutput.key}`}</p>
  <p>{cipherOutput.plainText}</p>
{:else}
  <p>{cipherOutput ? cipherOutput : ''}</p>
{/if}
