import { Module } from '@nestjs/common';

@Module({
    exports: [RolesModule]
})
export class RolesModule {}
