import 'dotenv/config';
import * as joi from 'joi';
import { NATS_SERVICE } from './services';

interface EnvVars {
    PORT: number;
    /*INVENTORY_MICROSERVICE_HOST: string;
    INVENTORY_MICROSERVICE_PORT: number;

    ORDERS_MICROSERVICE_HOST: string;
    ORDERS_MICROSERVICE_PORT: number;

    DELIVERYS_MICROSERVICE_HOST: string;
    DELIVERYS_MICROSERVICE_PORT: number;*/
    NATS_SERVERS: string[];

}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    /*INVENTORY_MICROSERVICE_HOST: joi.string().required(),
    INVENTORY_MICROSERVICE_PORT: joi.number().required(),

    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),

    DELIVERYS_MICROSERVICE_HOST: joi.string().required(),
    DELIVERYS_MICROSERVICE_PORT: joi.number().required(),*/

    NATS_SERVICE: joi.array().items(joi.string()).required()
})
    .unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVICE: process.env.NATS_SERVERS?.split(',')
})

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    /*inventoryMicroserviceHost: envVars.INVENTORY_MICROSERVICE_HOST,
    inventoryMicroservicePort: envVars.INVENTORY_MICROSERVICE_PORT,

    ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
    ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,

    deliverysMicroserviceHost: envVars.DELIVERYS_MICROSERVICE_HOST,
    deliverysMicroservicePort: envVars.DELIVERYS_MICROSERVICE_PORT,*/
    natsServers: envVars.NATS_SERVERS,
}
