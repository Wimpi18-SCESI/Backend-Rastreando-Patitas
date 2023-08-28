import { Injectable } from "@nestjs/common";
import { Level, LimitBitesTable, SecurityLevel } from "./interfaces";
import { limitsTable } from "./data/limitBitesTable.js";

@Injectable()
export class QrLibraryService {
  /**
   * ! Las tildes las cuenta como si fueran dos caracteres
   * ! Revisar los bits del artículo de Mirco (272) y de Jairo (288)
   */
  getQrMatrix(message: string) {
    const bitData = {
      mode: "0100",
      count: this.convertToByte(message.length.toString(2)),
      data: this.convertDataToByte(message),
      terminator: "0000",
      bitPadding: "",
      bytePadding: "",
    };
    // Colocamos como parametro la cantidad de bits que soporta la versión
    const aux =
      bitData.mode + bitData.count + bitData.data + bitData.terminator;
    for (let i = 0; i < (272 - aux.length) / 8; i++) {
      if (i % 2 == 0) bitData.bytePadding += "11101100";
      else bitData.bytePadding += "00010001";
    }

    this.convertToDataCodewordBytes(aux + bitData.bytePadding);

    return bitData;
  }

  private convertToDataCodewordBytes(binaryMessage: string) {
    for (let i = 0; i < binaryMessage.length / 8; i++) {
      // const codeword:string = binaryMessage.substring(i*8, i*8+8);
      const codeword: string = parseInt(
        binaryMessage.substring(i * 8, i * 8 + 8),
        2,
      ).toString(16);
      console.log(codeword);
    }
  }

  private convertToByte(s: string) {
    let zeros = "";
    for (let i = s.length; i < 8; i++) {
      zeros += "0";
    }
    return zeros + s;
  }

  private convertDataToByte(s: string) {
    let res = "";
    for (let i = 0; i < s.length; i++) {
      res += this.convertToByte(s.charCodeAt(i).toString(2));
    }
    return res;
  }


/**
 * Función para calcular el relleno de bits necesario para alcanzar una determinada capacidad de bits en un código QR.
 * @param {number} sumBits - La cantidad de bits existentes en el código QR.
 * @param {SecurityLevel} securityLevel - El nivel de seguridad que puede ser: [L, M, Q, H].
 * @param {Level} level - El nivel del código que puede ser: [ levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight, levelNine, levelTen].
 * @returns {string} - Una cadena de bits que representa el relleno de bytes necesario.
 */

  private calcBytePadding( sumBits: number, securityLevel: SecurityLevel, level: Level )
  {
    let result = "";
    const limitBiteTable: LimitBitesTable = limitsTable;
    let QRCapacity = limitBiteTable.ECCLevel[securityLevel][level];
    let numberOfMissingBits = QRCapacity - sumBits;

    for (let i = 0; i < numberOfMissingBits / 8; i++) {
      if (i % 2 == 0) result += "11101100";
      else result += "00010001";
    }

    return result;
  }
}
