import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const logger = new Logger('CurrentUser');
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    logger.debug('Current user from request:', user);
    return user;
  },
);
