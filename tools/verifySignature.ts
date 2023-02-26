import { zenroom_exec } from "zenroom";
import verifyGraphql from "../zenflows-crypto/src/verifyGraphql";
import { getUserPublicKey } from "./../zenflows/getUser";

type VerifySignature = (
  personId: string,
  signature: string,
  message: string
) => Promise<[boolean, string]>;
const verifySignature: VerifySignature = async (
  personId,
  signature,
  message
) => {
  try {
    const key = await getUserPublicKey({ id: personId });
    // const key = "2S8qn196efFgyrC1dYms6UkkhCnweYM6DJhLgd3kuPEm";
    const zenroomData = JSON.stringify({
      message: Buffer.from(message, "base64"),
      "eddsa signature": signature,
      "eddsa public key": key,
    });
    const keys = JSON.stringify({ "eddsa public key": key });
    const check = await zenroom_exec(verifyGraphql, {
      data: zenroomData,
      keys: keys,
    });
    if (check.logs.length > 0) {
      return [false, check.logs];
    }
    if (check.result !== "1") {
      return [false, "Unauthorized"];
    }
  } catch (e) {
    return [false, JSON.stringify(e)];
  }
  return [true, ""];
};

export default verifySignature;
