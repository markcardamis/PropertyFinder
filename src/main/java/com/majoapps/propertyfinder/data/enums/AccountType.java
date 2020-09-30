package com.majoapps.propertyfinder.data.enums;

public enum AccountType {
    UNAUTHENTICATED(100), AUTHENTICATED(200), ADMIN(10000);

    private AccountType(final int limit) {
        this.limit = limit;
    }

    private final int limit;

    public int getLimit() {
        return limit;
    }

}
