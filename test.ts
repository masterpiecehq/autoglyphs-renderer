import { ethers, getDefaultProvider } from "ethers";
import { asSVG } from './index';


const autoglyphsAddress = "0xd4e4078ca3495de5b1d4db434bebc5a986197782";
const autoglyphsAbi = [
  "function draw(uint256 id) view returns (string)",
  "function totalSupply() view returns (uin255)",
];


async function test(): Promise<void> {
  const autoglyphsContract = new ethers.Contract(autoglyphsAddress, autoglyphsAbi, getDefaultProvider());
  const url = await autoglyphsContract.draw(1);
  let instructions = url.slice('data:text/plain;charset=utf-8,'.length)
  instructions = instructions.replace(/%0A/g, '');
  console.log(asSVG(instructions));
}

test();
