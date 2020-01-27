FROM php:7.3-fpm

RUN apt-get update -y
RUN apt-get -y install sudo wget gcc make autoconf libc-dev pkg-config libzip-dev \
  	git
#  	 \
#  	libmemcached-dev \
#  	libz-dev \
#  	libpq-dev \
#  	libssl-dev libssl-doc libsasl2-dev \
#  	libmcrypt-dev \
#  	libxml2-dev \
#  	zlib1g-dev libicu-dev g++ \
#  	libldap2-dev libbz2-dev \
#  	curl libcurl4-openssl-dev \
#  	libenchant-dev libgmp-dev firebird-dev libib-util \
#  	re2c libpng++-dev \
#  	libwebp-dev libjpeg-dev libjpeg62-turbo-dev libpng-dev libvpx-dev libfreetype6-dev \
#  	libmagick++-dev \
#  	libmagickwand-dev \
#  	zlib1g-dev libgd-dev \
#  	libtidy-dev libxslt1-dev libmagic-dev libexif-dev file \
#  	sqlite3 libsqlite3-dev libxslt-dev \
#  	libmhash2 libmhash-dev libc-client-dev libkrb5-dev libssh2-1-dev \
#  	unzip libpcre3 libpcre3-dev \
#  	poppler-utils ghostscript libmagickwand-6.q16-dev libsnmp-dev libedit-dev libreadline6-dev libsodium-dev \
#  	freetds-bin freetds-dev freetds-common libct4 libsybdb5 tdsodbc libreadline-dev librecode-dev libpspell-dev \
#  && rm -rf /var/lib/apt/lists/*

RUN pecl install xdebug && docker-php-ext-enable xdebug

#
RUN docker-php-ext-install zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN addgroup -gid 1000 node

RUN useradd -u 1000 asyou -G node,sudo -s /bin/sh -N -m

RUN echo "asyou:123" | chpasswd

USER asyou

COPY php.ini /usr/local/etc/php/
COPY xdebug.ini /usr/local/etc/php/conf.d