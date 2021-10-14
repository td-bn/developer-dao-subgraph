import { BigInt } from "@graphprotocol/graph-ts"
import { Dev, ClaimCall, Transfer } from '../generated/Dev/Dev';
import { DevToken } from "../generated/schema"

export function handleClaim(call: ClaimCall): void {
  let id = call.inputs.tokenId;
  let from = call.from;
  let contractAddress = call.to;

  let token = new DevToken(id.toString());
  token.owner = from;

  setOtherFields(token, id, Dev.bind(contractAddress));
  token.save();
}

export function handleTransfer(event: Transfer): void {
  let id = event.params.tokenId.toString(); 
  let token = DevToken.load(id);
  if (token == null) {
    return;
  }
  token.owner = event.params.to;
  token.save();
}

function setOtherFields(token: DevToken, id: BigInt, contract: Dev): void {
  setLanguage(token, id, contract);
  setClothing(token, id, contract);
  setIndustry(token, id, contract);
  setLocation(token, id, contract);
  setMind(token, id, contract);
  setVibe(token, id, contract);
  setOS(token, id, contract);
  setTextEditor(token, id, contract);
  setTokenURI(token, id, contract);
}

function setLanguage(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getLanguage(id);
  if (!res.reverted) {
    token.Language = res.value;
  }
}

function setClothing(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getClothing(id);
  if (!res.reverted) {
    token.Clothing = res.value;
  }
}

function setIndustry(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getIndustry(id);
  if (!res.reverted) {
    token.Industry = res.value;
  }
}

function setLocation(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getLocation(id);
  if (!res.reverted) {
    token.Location = res.value;
  }
}

function setMind(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getMind(id);
  if (!res.reverted) {
    token.Mind = res.value;
  }
}

function setVibe(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getVibe(id);
  if (!res.reverted) {
    token.Vibe = res.value;
  }
}

function setOS(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getOS(id);
  if (!res.reverted) {
    token.OS = res.value;
  }
}

function setTextEditor(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_getTextEditor(id);
  if (!res.reverted) {
    token.TextEditor = res.value;
  }
}

function setTokenURI(token: DevToken, id: BigInt, contract: Dev): void {
  let res = contract.try_tokenURI(id);

  if (!res.reverted) {
    token.tokenURI = res.value;
  }
}

