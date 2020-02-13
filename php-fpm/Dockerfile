FROM php:7.3-fpm

MAINTAINER ASYOU <asyou1985@gmail.com>

RUN apt-get update -y
RUN apt-get -y install \
    sudo \
    wget \
    curl \
    nano \
    unzip \
    gcc \
    make \
    autoconf \
    libc-dev \
    pkg-config \
    libzip-dev \
  	git \
  	locales \
  	jpegoptim optipng pngquant gifsicle \
  	libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    libicu-dev \
    libpq-dev \
    libxpm-dev \
    libvpx-dev \
        && pecl install xdebug \
        && docker-php-ext-enable xdebug \
        && docker-php-ext-install -j$(nproc) gd \
        && docker-php-ext-install -j$(nproc) intl \
        && docker-php-ext-install -j$(nproc) zip \
        && docker-php-ext-install -j$(nproc) pgsql \
        && docker-php-ext-install -j$(nproc) pdo_pgsql \
        && docker-php-ext-install -j$(nproc) exif
#  	build-essential \
#  	#default-mysql-client \
#    #mariadb-client \
#    #default-mysql-client \

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lis

RUN addgroup -gid 1000 node

RUN useradd -u 1000 asyou -G node,sudo -s /bin/sh -N -m

RUN echo "asyou:123" | chpasswd

USER asyou

WORKDIR /code

COPY php.ini /usr/local/etc/php/
COPY xdebug.ini /usr/local/etc/php/conf.d