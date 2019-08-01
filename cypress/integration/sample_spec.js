describe('Vigenere Tests', function() {
  it('Defaults to encryption', function() {
    cy.visit('/'); 
    cy.get('#valueText')
      .type('abc');

    cy.get('textarea')
      .type('hello world');

    cy.get('p:last').should('contain', 'HFNLP YOSND');
  })

  it('Decryption with a key', function() {
    cy.visit('/'); 
    cy.get('#cryptMode').select('Decryption With Key');
    cy.get('#valueText')
      .type('abc');

    cy.get('textarea')
      .type('HFNLP YOSND');

    cy.get('p:last').should('contain', 'HELLO WORLD');
  })

  it('Decryption without key', function() {
    cy.visit('/'); 
    cy.get('#cryptMode').select('Decryption');
    cy.get('#valueText')
      .type('20');

    cy.get('textarea').invoke('val',
      "IIEHSAB YTP HRO OONQP EKLVP HOO O MPUF WEPOZM WCLLRODVED ZY VWMEP CB UIPDA SAACOWKTRU SQ NVWFRNWLV. MTBCZVJ ZHW PYRAOIPG AS OLFYM SJ WOI PLGEBVDV VTPYBAGJ LQK HFNHEZZEB VJ STG PSDAHY XSZICV EZ GPWAZGEHZZQ JSFWR KTWPU H KCPOPSI NRUXCLGP HF SLZ SHY OJR KSRBKS HWPV YTV VAY SS JSMPU HTAPONSU OLZWLEWOTZPG. VR ESS OHIPQNXS ZT ZOINB'Z VPRONR STQNPPJ VWR KSH MMCXSOH IPOPEYNS WBU ZI OMD UIZUVXHUX ESS DWXSHZX ZAWJWFY. LU YYOSNGKLQKMYR RWFTJ ZHW ESS OIGPUPSC. MWJUCPB DED MM JC DPDUW OPTEQZPQA FFE RWFTJ ZHW NWSRSI. SH DED LH PVV DDTI ETAA VRFJOXJ CSOSIGHK EYO TWGKTGPSFD OJR YTV TEYYSNG KSRBKS HSHZ-SCHK APCS JCK TQCMETBC. WE EKHX CPGLSTE KPW QCWABU SDK KCPOPZP EKL EOGOJHRRH. IMYRZAM NLV ZYCP CB PVTQN PTVSZ KYPULZPC VA OGAHHVPO RWFTJ ZHW NZBPWEFDSPJ RWRWER RMJPYGA.").trigger('input');

    cy.get('#app p:first').should('contain', 'Recovered key: HELLOWORLD');

    cy.get('p:last').should('contain', "BETWEEN HIM AND DARCY THERE WAS A VERY STEADY FRIENDSHIP IN SPITE OF GREAT OPPOSITION OF CHARACTER. BINGLEY WAS ENDEARED TO DARCY BY THE EASINESS OPENNESS AND DUCTILITY OF HIS TEMPER THOUGH NO DISPOSITION COULD OFFER A GREATER CONTRAST TO HIS OWN AND THOUGH WITH HIS OWN HE NEVER APPEARED DISSATISFIED. ON THE STRENGTH OF DARCY'S REGARD BINGLEY HAD THE FIRMEST RELIANCE AND OF HIS JUDGEMENT THE HIGHEST OPINION. IN UNDERSTANDING DARCY WAS THE SUPERIOR. BINGLEY WAS BY NO MEANS DEFICIENT BUT DARCY WAS CLEVER. HE WAS AT THE SAME TIME HAUGHTY RESERVED AND FASTIDIOUS AND HIS MANNERS THOUGH WELL-BRED WERE NOT INVITING. IN THAT RESPECT HIS FRIEND HAD GREATLY THE ADVANTAGE. BINGLEY WAS SURE OF BEING LIKED WHEREVER HE APPEARED DARCY WAS CONTINUALLY GIVING OFFENSE.");
  })
})
