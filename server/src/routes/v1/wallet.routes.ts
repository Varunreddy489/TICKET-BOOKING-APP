import Router from "express";

import {
  AddMoneyController,
  GetMoneyController,
  PayWalletController,
  GetAllTransactionsController,
} from "../../controllers";
import { WalletValidator } from "../../validations/wallet.validation";

const router = Router();

// *  /api/v1/wallet/:userId POST
router.post("/:userId", WalletValidator, AddMoneyController);

// *  /api/v1/wallet/pay POST
router.post("/pay", PayWalletController);

// *  /api/v1/wallet/:userId GET
router.get(`/:userId`, GetMoneyController);

// *  /api/v1/wallet/transactions/:userId GET
router.get(`/transactions/:userId`, GetAllTransactionsController);

export { router as walletRoutes };
