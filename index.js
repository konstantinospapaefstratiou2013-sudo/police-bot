const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Ασφάλεια: Το token και το client id διαβάζονται από το περιβάλλον του server (Render Environment Variables)
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// IDs καναλιών για τα logs
const LOG_ANAFORA_CHANNEL_ID = '1554181356215599204';
const LOG_APOUSIA_CHANNEL_ID = '1554182475192868905';
const LOG_SHMA_CHANNEL_ID = '1554186074182385906';
const LOG_APPLICATION_CHANNEL_ID = '1554191366513369099';

client.once('ready', async () => {
    console.log(`Το bot συνδέθηκε επιτυχώς ως ${client.user.tag}!`);

    const commands = [
        new SlashCommandBuilder()
            .setName('sychnotites')
            .setDescription('Εμφανίζει τις συχνότητες της υπηρεσίας.'),
        new SlashCommandBuilder()
            .setName('kodikes')
            .setDescription('Εμφανίζει όλους τους ασύρματους κώδικες της αστυνομίας.'),
        new SlashCommandBuilder()
            .setName('anafora')
            .setDescription('Ανοίγει το πάνελ για την υποβολή αναφοράς αστυνομικού.'),
        new SlashCommandBuilder()
            .setName('apousia')
            .setDescription('Ανοίγει το πάνελ για την αίτηση απουσίας αστυνομικού.'),
        new SlashCommandBuilder()
            .setName('shmata')
            .setDescription('Εμφανίζει το πάνελ για επιλογή σήματος.'),
        new SlashCommandBuilder()
            .setName('application')
            .setDescription('Εμφανίζει το πάνελ για την υποβολή αίτησης (Application).')
    ];

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Όλες οι Slash Commands καταχωρίθηκαν επιτυχώς!');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return;

    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;

        if (commandName === 'sychnotites') {
            const embed = new EmbedBuilder()
                .setColor(0x0033aa)
                .setTitle('📡 Συχνότητες Υπηρεσίας')
                .addFields(
                    { name: 'Συχνότητες ΕΛΑΣ', value: '• Συχνότητα ΕΛΑΣ: 1200\n• Συχνότητα Διασυνοριακού: 6000\n• Συχνότητα Ελληνικού Στρατού: 5001\n• Συχνότητα ΕΚΑΒ: 1110' }
                )
                .setFooter({ text: 'Rigas Police' });
            return interaction.reply({ embeds: [embed] });
        }

        if (commandName === 'kodikes') {
            const embed = new EmbedBuilder()
                .setColor(0xaa0000)
                .setTitle('🚨 ΑΣΥΡΜΑΤΟΙ ΚΩΔΙΚΕΣ ΑΣΤΥΝΟΜΙΑΣ')
                .setDescription('**Βασικοί Κώδικες & Σήματα:**')
                .addFields(
                    { name: 'Κώδικες Ασυρμάτου (Μέρος 1)', value: '• **Α-1:** ΑΝΑΓΚΗ ΑΜΕΣΗΣ ΒΟΗΘΕΙΑΣ\n• **Α-2:** ΕΤΟΙΜΟΣ\n• **Α-3:** ΑΡΝΗΤΙΚΟ\n• **Α-4:** ΕΛΗΦΘΗ\n• **Α-5:** ΕΠΑΝΑΛΑΒΑΤΕ\n• **Α-6:** ΑΠΑΣΧΟΛΗΜΕΝΟΣ\n• **Α-7:** ΕΚΤΟΣ ΥΠΗΡΕΣΙΑΣ\n• **Α-8:** ΕΝΑΡΞΗ ΥΠΗΡΕΣΙΑΣ\n• **Α-9:** ΣΙΓΗ ΑΣΥΡΜΑΤΟΥ\n• **Α-10:** ΔΟΚΙΜΗ\n• **Α-11:** ΑΝΑΦΟΡΑ ΘΕΣΗΣ\n• **Α-12:** ΚΑΤΑΔΙΩΞΗ\n• **Α-13:** ΤΗΛΕΦΩΝΕΙΤΕ ΣΤΟ ΚΕΝΤΡΟ\n• **Α-14:** ΠΡΟΣΑΓΩΓΗ ΑΤΟΜΟΥ\n• **Α-15:** ΚΑΚΗ ΛΗΨΗ' },
                    { name: 'Κώδικες Ασυρμάτου (Μέρος 2)', value: '• **Α-19:** ΣΗΜΕΙΟ ΣΥΝΑΝΤΗΣΗΣ ΑΠΟ ΚΟΙΝΟΥ ΜΕ ΤΑ ΠΕΡΙΠΟΛΙΚΑ\n• **Α-20:** ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΤΜΗΜΑ\n• **Α-22:** ΚΑΛΕΣΤΕ ΑΣΘΕΝΟΦΟΡΟ\n• **Α-23:** ΑΛΛΑΓΗ ΣΥΧΝΟΤΗΤΑΣ\n• **Α-24:** ΣΥΝΔΡΟΜΗ-ΕΝΙΣΧΥΣΗ\n• **Α-25:** ΕΛΕΓΧΟΣ ΣΤΟΙΧΕΙΩΝ ΤΑΥΤΟΤΗΤΑΣ\n• **Α-26:** ΕΛΕΓΧΟΣ ΠΙΝΑΚΙΔΑΣ ΟΧΗΜΑΤΟΣ\n• **Ε-8:** ΚΛΟΠΗ ΣΠΙΤΙΟΥ\n• **Ε-20:** ΑΠΑΓΩΓΗ ΑΣΤΥΝΟΜΙΚΟΥ\n• **Ε-21:** ΑΠΑΓΩΓΗ ΠΟΛΙΤΗ\n• **Ε-22:** ΛΗΣΤΕΙΑ ΣΕ ΤΡΑΠΕΖΑ-ΜΑΓΑΖΙ' },
                    { name: 'Ειδικοί Κώδικες & Καταστάσεις', value: '• **Ε-23:** ΟΜΗΡΕΙΑ ΠΟΛΙΤΗ\n• **Ε-24:** ΟΜΗΡΕΙΑ ΑΣΤΥΝΟΜΙΚΟΥ\n• **Β-22:** ΠΥΡΟΒΟΛΙΣΜΟΙ\n• **Β-24:** ΥΠΕΡΤΟ ΟΠΛΟ\n• **Ε-404:** ΚΕΡΑΥΝΟΣ (ΤΕΧΝΙΚΟ ΠΡΟΒΛΗΜΑ)\n• **Ε-410:** ΚΥΒΕΡΝΗΤΗΣ (ΣΤΟ ΣΗΜΕΙΟ)\n• **Ε-100:** ΕΛΙΚΟΠΤΕΡΟ\n• **Κ-99:** ΤΡΑΥΜΑΤΙΣΜΟΣ ΑΣΤΥΝΟΜΙΚΟΥ, ΟΛΕΣ ΟΙ ΔΙΑΘΕΣΙΜΕΣ ΜΟΝΑΔΕΣ ΝΑ ΣΥΝΔΡΑΜΟΥΝ ΑΜΕΣΑ ΣΤΟ ΣΗΜΕΙΟ ΜΑΖΙ ΜΕ ΑΣΘΕΝΟΦΟΡΟ.' },
                    { name: 'ΦΑΡΙ', value: '• **ΣΗΜΑ Α:** ΑΠΕΝΕΡΓΟΠΟΙΗΣΗ ΗΧΗΤΙΚΩΝ ΚΑΙ ΦΩΤΕΙΝΩΝ ΣΗΜΑΤΩΝ\n• **ΣΗΜΑ Β:** ΧΡΗΣΗ ΦΑΡΟΥ\n• **ΣΗΜΑ Γ:** ΧΡΗΣΗ ΗΧΗΤΙΚΩΝ ΚΑΙ ΦΩΤΕΙΝΩΝ ΣΗΜΑΤΩΝ' }
                )
                .setFooter({ text: 'Rigas Police' });
            return interaction.reply({ embeds: [embed] });
        }

        if (commandName === 'anafora') {
            const embed = new EmbedBuilder()
                .setColor(0xff3300)
                .setTitle('📋 Σύστημα Αναφορών Αστυνομικών')
                .setDescription('Πατήστε το κουμπί παρακάτω για να καταχωρίσετε την αναφορά σας.')
                .setFooter({ text: 'Rigas Police' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_anafora').setLabel('Καταχώριση Αναφοράς').setStyle(ButtonStyle.Danger)
            );
            return interaction.reply({ embeds: [embed], components: [row] });
        }

        if (commandName === 'apousia') {
            const embed = new EmbedBuilder()
                .setColor(0xffaa00)
                .setTitle('📅 Σύστημα Απουσιών Αστυνομικών')
                .setDescription('Πατήστε το κουμπί παρακάτω για να υποβάλετε την αίτηση απουσίας σας.')
                .setFooter({ text: 'Rigas Police' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_apousia').setLabel('Υποβολή Αίτησης Απουσίας').setStyle(ButtonStyle.Secondary)
            );
            return interaction.reply({ embeds: [embed], components: [row] });
        }

        if (commandName === 'shmata') {
            const embed = new EmbedBuilder()
                .setColor(0x0055ff)
                .setTitle('📢 Επιλογή Σήματος (Κέντρο Ελέγχου)')
                .setDescription('Πατήστε το κουμπί παρακάτω για να δηλώσετε το σήμα σας.\n*(Σημείωση: Τα σήματα 0-15 προορίζονται αποκλειστικά για την ανώτατη διοίκηση)*')
                .setFooter({ text: 'Rigas Police' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_shma_call').setLabel('Παίρνω Σήμα').setStyle(ButtonStyle.Primary)
            );
            return interaction.reply({ embeds: [embed], components: [row] });
        }

        if (commandName === 'application') {
            const embed = new EmbedBuilder()
                .setColor(0x00aa33)
                .setTitle('📝 Υποβολή Αίτησης (Application)')
                .setDescription('Πατήστε το κουμπί παρακάτω για να συμπληρώσετε την αίτησή σας.')
                .setFooter({ text: 'Rigas Police' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_application').setLabel('Υποβολή Application').setStyle(ButtonStyle.Success)
            );
            return interaction.reply({ embeds: [embed], components: [row] });
        }
    }

    if (interaction.isButton()) {
        const { customId } = interaction;

        if (customId === 'btn_anafora') {
            const modal = new ModalBuilder().setCustomId('modal_anafora').setTitle('Καταχώριση Αναφοράς Αστυνομικού');
            const shmaInput = new TextInputBuilder().setCustomId('shma_police').setLabel('Το σήμα του').setStyle(TextInputStyle.Short).setRequired(true);
            const clipInput = new TextInputBuilder().setCustomId('clip_link').setLabel('Link Clip (Αποδεικτικό)').setStyle(TextInputStyle.Short).setRequired(true);
            const descInput = new TextInputBuilder().setCustomId('anafora_text').setLabel('Περιγραφή Αναφοράς').setStyle(TextInputStyle.Paragraph).setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(shmaInput),
                new ActionRowBuilder().addComponents(clipInput),
                new ActionRowBuilder().addComponents(descInput)
            );
            return interaction.showModal(modal);
        }

        if (customId === 'btn_apousia') {
            const modal = new ModalBuilder().setCustomId('modal_apousia').setTitle('Αίτηση Απουσίας Αστυνομικού');
            const shmaInput = new TextInputBuilder().setCustomId('ap_shma').setLabel('Το σήμα σου').setStyle(TextInputStyle.Short).setRequired(true);
            const logosInput = new TextInputBuilder().setCustomId('ap_logos').setLabel('Λόγος').setStyle(TextInputStyle.Short).setRequired(true);
            const diarkeiaInput = new TextInputBuilder().setCustomId('ap_diarkeia').setLabel('Διάρκεια').setStyle(TextInputStyle.Short).setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(shmaInput), 
                new ActionRowBuilder().addComponents(logosInput), 
                new ActionRowBuilder().addComponents(diarkeiaInput)
            );
            return interaction.showModal(modal);
        }

        if (customId === 'btn_shma_call') {
            const modal = new ModalBuilder().setCustomId('modal_shma').setTitle('Επιλογή Σήματος');
            const shmaInput = new TextInputBuilder().setCustomId('shma_num').setLabel('Γράψτε νούμερο σήματος').setStyle(TextInputStyle.Short).setRequired(true);
            modal.addComponents(new ActionRowBuilder().addComponents(shmaInput));
            return interaction.showModal(modal);
        }

        if (customId === 'btn_application') {
            const modal = new ModalBuilder().setCustomId('modal_application').setTitle('Φόρμα Αίτησης (Application)');
            const onomaInput = new TextInputBuilder().setCustomId('app_onoma').setLabel('Όνομα in-game').setStyle(TextInputStyle.Short).setRequired(true);
            const epithetoInput = new TextInputBuilder().setCustomId('app_epitheto').setLabel('Επώνυμο in-game').setStyle(TextInputStyle.Short).setRequired(true);
            const steamInput = new TextInputBuilder().setCustomId('app_steam').setLabel('Steam Name').setStyle(TextInputStyle.Short).setRequired(true);
            const ilikiaInput = new TextInputBuilder().setCustomId('app_ilikia').setLabel('Ηλικία').setStyle(TextInputStyle.Short).setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(onomaInput),
                new ActionRowBuilder().addComponents(epithetoInput),
                new ActionRowBuilder().addComponents(steamInput),
                new ActionRowBuilder().addComponents(ilikiaInput)
            );
            return interaction.showModal(modal);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'modal_anafora') {
            const shma = interaction.fields.getTextInputValue('shma_police');
            const clip = interaction.fields.getTextInputValue('clip_link');
            const text = interaction.fields.getTextInputValue('anafora_text');

            const logChannel = client.channels.cache.get(LOG_ANAFORA_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor(0xff3300)
                    .setTitle('📋 Νέα Αναφορά Αστυνομικού')
                    .addFields(
                        { name: '🛡️ Σήμα Αναφέροντος/Εμπλεκομένου', value: shma, inline: false },
                        { name: '🎬 Link Clip', value: clip, inline: false },
                        { name: '📝 Περιγραφή', value: text, inline: false },
                        { name: '👤 Χρήστης Discord', value: `<@${interaction.user.id}> (${interaction.user.tag})`, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Rigas Police Logs' });

                await logChannel.send({ embeds: [logEmbed] });
            }

            return interaction.reply({ 
                content: `✅ Η αναφορά σου καταχωρίθηκε επιτυχώς και στάλθηκε στα logs!`, 
                ephemeral: true 
            });
        }

        if (interaction.customId === 'modal_apousia') {
            const shma = interaction.fields.getTextInputValue('ap_shma');
            const logos = interaction.fields.getTextInputValue('ap_logos');
            const diarkeia = interaction.fields.getTextInputValue('ap_diarkeia');

            const logChannel = client.channels.cache.get(LOG_APOUSIA_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor(0xffaa00)
                    .setTitle('📅 Νέα Αίτηση Απουσίας Αστυνομικού')
                    .addFields(
                        { name: '🛡️ Σήμα', value: shma, inline: false },
                        { name: '📌 Λόγος', value: logos, inline: false },
                        { name: '⏱️ Διάρκεια', value: diarkeia, inline: false },
                        { name: '👤 Χρήστης Discord', value: `<@${interaction.user.id}> (${interaction.user.tag})`, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Rigas Police Apousies Logs' });

                await logChannel.send({ embeds: [logEmbed] });
            }

            return interaction.reply({ 
                content: `📅 Η αίτηση απουσίας υποβλήθηκε επιτυχώς και στάλθηκε στα logs!`, 
                ephemeral: true 
            });
        }

        if (interaction.customId === 'modal_shma') {
            const numStr = interaction.fields.getTextInputValue('shma_num').trim();
            const num = parseInt(numStr, 10);

            if (!isNaN(num) && num >= 0 && num <= 15) {
                return interaction.reply({ content: '❌ Αυτό το σήμα δεν είναι διαθέσιμο.', ephemeral: true });
            }

            const logChannel = client.channels.cache.get(LOG_SHMA_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor(0x0055ff)
                    .setTitle('📢 Νέα Επιλογή Σήματος')
                    .addFields(
                        { name: '🛡️ Σήμα', value: numStr, inline: false },
                        { name: '👤 Χρήστης Discord', value: `<@${interaction.user.id}> (${interaction.user.tag})`, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Rigas Police Shmata Logs' });

                await logChannel.send({ embeds: [logEmbed] });
            }

            return interaction.reply({ content: `✅ Καταχωρίθηκε επιτυχώς`, ephemeral: true });
        }

        if (interaction.customId === 'modal_application') {
            const onoma = interaction.fields.getTextInputValue('app_onoma');
            const epitheto = interaction.fields.getTextInputValue('app_epitheto');
            const steam = interaction.fields.getTextInputValue('app_steam');
            const ilikia = interaction.fields.getTextInputValue('app_ilikia');

            const logChannel = client.channels.cache.get(LOG_APPLICATION_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor(0x00aa33)
                    .setTitle('📝 Νέα Αίτηση (Application)')
                    .addFields(
                        { name: '👤 Όνομα in-game', value: onoma, inline: false },
                        { name: '📛 Επώνυμο in-game', value: epitheto, inline: false },
                        { name: '🎮 Steam Name', value: steam, inline: false },
                        { name: '🎂 Ηλικία', value: ilikia, inline: false },
                        { name: '🎮 Χρήστης Discord', value: `<@${interaction.user.id}> (${interaction.user.tag})`, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Rigas Police Application Logs' });

                await logChannel.send({ embeds: [logEmbed] });
            }

            return interaction.reply({ 
                content: `✅ Η αίτησή σου υποβλήθηκε επιτυχώς!`, 
                ephemeral: true 
            });
        }
    }
});

client.login(TOKEN);