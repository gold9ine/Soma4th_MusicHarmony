QT       += core network

QT       -= gui

TARGET = EventHandler
CONFIG   += console
CONFIG   -= app_bundle

TEMPLATE = app

INCLUDEPATH += ../QtWebsocket/

SOURCES += main.cpp \
    MainLogic.cpp \
    SocketThread.cpp \
    ServerThreaded.cpp \
    UdpServer.cpp

HEADERS += \
    MainLogic.h \
    SocketThread.h \
    ServerThreaded.h \
    ../QtWebsocket/QWsSocket.h \
    ../QtWebsocket/QWsServer.h \
    UdpServer.h

LIBS += -L ../QtWebsocket/ -lQtWebsocket
