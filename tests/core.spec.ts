import * as fc from "fast-check";
import {
  coincidenceIndex,
  cosetShift,
  cosets,
  estimateKeyLength,
  recoverVigenere,
  rotate,
  encrypt,
  decrypt,
  zip
} from "../src/core/vigenere-cipher";

test("zip", () => {
  expect(zip(["a"], ["b"])).toStrictEqual([["a", "b"]]);
  expect(zip(["a"], [1])).toStrictEqual([["a", 1]]);
  expect(zip(["a", "b"], [1, 2])).toStrictEqual([["a", 1], ["b", 2]]);
});

test("rotate", () => {
  expect(rotate(["a", "b"], 0)).toStrictEqual(["a", "b"]);
  expect(rotate(["a", "b"], 1)).toStrictEqual(["b", "a"]);
  expect(rotate(["a", "b"], 2)).toStrictEqual(["a", "b"]);
  expect(rotate(["a", "b"], 3)).toStrictEqual(["b", "a"]);

  expect(rotate(["a", "b"], -1)).toStrictEqual(["b", "a"]);
  expect(rotate(["a", "b"], -2)).toStrictEqual(["a", "b"]);
  expect(rotate(["a", "b"], -3)).toStrictEqual(["b", "a"]);
});

test("encrypt", () => {
  expect(encrypt("hi", "a")).toStrictEqual("HI");
  expect(encrypt("hi pie", "a")).toStrictEqual("HI PIE");
  expect(encrypt("hi pie", "b")).toStrictEqual("IJ QJF");
  expect(encrypt("hi pie", "ab")).toStrictEqual("HJ PJE");
  expect(encrypt("HI PIE", "AB")).toStrictEqual("HJ PJE");

  expect(encrypt("z", "a")).toStrictEqual("Z");
  expect(encrypt("z", "b")).toStrictEqual("A");
});

test("decrypt", () => {
  expect(decrypt("HI", "a")).toStrictEqual("HI");
  expect(decrypt("HI PIE", "a")).toStrictEqual("HI PIE");
  expect(decrypt("IJ QJF", "b")).toStrictEqual("HI PIE");
  expect(decrypt("HJ PJE", "ab")).toStrictEqual("HI PIE");
  expect(decrypt("HJ PJE", "AB")).toStrictEqual("HI PIE");

  expect(decrypt("Z", "a")).toStrictEqual("Z");
  expect(decrypt("A", "b")).toStrictEqual("Z");
});

test("cosets", () => {
  expect(cosets("RSTCSJLSLRSLFELGWLFIISIKRMGL", 3)).toStrictEqual([
    "RCLRFGFSRL".split(""),
    "SSSSEWIIM".split(""),
    "TJLLLLIKG".split("")
  ]);

  expect(cosets("RSTCSJLSLRSLFELGWLFIISIKRMGL", 1)).toStrictEqual([
    "RSTCSJLSLRSLFELGWLFIISIKRMGL".split("")
  ]);
});

test("coincidenceIndex", () => {
  expect(
    coincidenceIndex(
      "THEREARETWOWAYSOFCONSTRUCTINGASOFTWAREDESIGNONEWAYISTOMAKEITSOSIMPLETHATTHEREAREOBVIOUSLYNODEFICIENCIESANDTHEOTHERWAYISTOMAKEITSOCOMPLICATEDTHATTHEREARENOOBVIOUSDEFICIENCIESTHEFIRSTMETHODISFARMOREDIFFICULT".split(
        ""
      )
    )
  ).toBeCloseTo(0.068101);
});

test("estimateKeyLength", () => {
  expect(
    estimateKeyLength(
      "VVQGYTVVVKALURWFHQACMMVLEHUCATWFHHIPLXHVUWSCIGINCMUHNHQRMSUIMHWZODXTNAEKVVQGYTVVQPHXINWCABASYYMTKSZRCXWRPRFWYHXYGFIPSBWKQAMZYBXJQQABJEMTCHQSNAEKVVQGYTVVPCAQPBSLURQUCVMVPQUTMMLVHWDHNFIKJCPXMYEIOCDTXBJWKQGAN",
      10
    )
  ).toBe(8);
});

test("cosetShift", () => {
  expect(cosetShift("WWBQCUOBSW".split(""))).toBe(14);
});

test("recoverVigenere", () => {
  expect(
    recoverVigenere(
      "DA ZFI SFSP AVQ LSNP XYSZW XAL CDAFGQ UISM TPHZGAMKTTFTCCFXKFCRGGLPFETZMMMZOZDEADWVZWMWKVGQSOHQSVHPWFKLSLEASEPWHMJEGKPURVSXJXVBWVPOSDETEQTXOBZIKWCXLWNUOVJMJCLLOEOFAZENVMJILOWZEKAZEJAQDILSWWESGUGKTZGQZVRMNWTQSEOTKTKPBSTAMQVERMJEGLJQRTLGFJYGSPTZPGTACMOECBXSESCIYGUFPKVILLTWDKSZODFWFWEAAPQTFSTQIRGMPMELRYELHQSVWBAWMOSDELHMUZGPGYEKZUKWTAMZJMLSEVJQTGLAWVOVVXHKWQILIEUYSZWXAHHUSZOGMUZQCIMVZUVWIFJJHPWVXFSETZEDF",
      20
    )
  ).toStrictEqual({
    key: "AMBROISETHOMAS",
    plainText:
      "DO YOU KNOW THE LAND WHERE THE ORANGE TREE BLOSSOMSTHECOUNTRYOFGOLDENFRUITSANDMARVELOUSROSESWHERETHEBREEZEISSOFTERANDBIRDSLIGHTERWHEREBEESGATHERPOLLENINEVERYSEASONANDWHERESHINESANDSMILESLIKEAGIFTFROMGODANETERNALSPRINGTIMEUNDERANEVERBLUESKYALASBUTICANNOTFOLLOWYOUTOTHATHAPPYSHOREFROMWHICHFATEHASEXILEDMETHEREITISTHERETHATISHOULDLIKETOLIVETOLOVETOLOVEANDTODIEITISTHERETHATISHOULDLIKETOLIVEITISTHEREYESTHERE"
  });
});

test("encrypt and decrypt roundtrip", () => {
  fc.assert(
    fc.property(fc.lorem(), fc.lorem(), (plain, key) => {
      const l = plain.toUpperCase();
      const cipher = encrypt(l, key);
      const round = decrypt(cipher, key);
      expect(round).toEqual(l);
    })
  );
});
